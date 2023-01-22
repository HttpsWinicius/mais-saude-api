import { dbClient } from "../../config/database.js";
import dayjs from "dayjs";
import axios from "axios";

export const updateVaccination = async (req, res) => {
  try {
    await dbClient("tbl_vaccination").where("id", req.body.idVaccine).update({
      date: req.body.date,
      batch: req.body.batch,
    });

    const [vaccination] = await dbClient("tbl_vaccination").where(
      "id",
      req.body.idVaccine
    );

    const resultVaccine = await getPeriodicity(vaccination.id_vaccine);
    const schedule_date = dayjs(req.body.date)
      .add(resultVaccine.periodicity, "day")
      .format("YYYY-MM-DD");
    const resultPerson = await getNamePerson(req.user);

    await dbClient("tbl_vaccination").insert({
      id_person: req.user,
      id_vaccine: vaccination.id_vaccine,
      schedule_date,
    });

    await sendSms(
      resultPerson.name,
      resultVaccine.name,
      schedule_date,
      resultPerson.phone
    );

    res.status(200).json("Success");
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ Error: e.message });
  }
};

const sendSms = async (namePerson, nameVaccine, scheduleDate, telephone) => {
  scheduleDate = dayjs(scheduleDate).format("DD/MM/YYYY");

  const textMessage =
    "Atenção!! " +
    namePerson +
    ", sua proxima vacina de " +
    nameVaccine +
    " foi agendada para " +
    scheduleDate +
    " mais não se preocupe, te lembraremos no dia.";

  var data = JSON.stringify({
    numberPhone: telephone,
    message: textMessage,
    flashSms: true,
  });

  var config = {
    method: "post",
    url: "https://api.nvoip.com.br/v2/sms?napikey=MGlJQWpsbjVSSkQ5NWxNSEwzMWtUNWNPOElHT05naGU=",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getPeriodicity = async (idVaccine) => {
  const [result] = await dbClient
    .select("vaccine.periodicity", "vaccine.name")
    .from("tbl_vaccine as vaccine")
    .where("vaccine.id", idVaccine);

  console.log(result);

  return result;
};

const getNamePerson = async (idPerson) => {
  const [result] = await dbClient
    .select("person.phone", "person.name")
    .from("tbl_person as person")
    .where("person.id", idPerson);

  return result;
};

export const getStatus = (vaccination) => {
  if (!vaccination.date && !vaccination.schedule_date)
    return { status: "Não informado", order: 1 };

  if (vaccination.date) {
    return { status: "Em dia", order: 3 };
  }

  if (dayjs(vaccination.schedule_date).isBefore(dayjs())) {
    return { status: "Em atraso", order: 2 };
  }

  return { status: "Em dia", order: 3 };
};

export const formatDate = (dateValue) => {
  if (!dateValue) return dateValue;
  return dayjs(dateValue).format("DD/MM/YYYY");
};

export const getVaccination = async (req, res) => {
  const data = await dbClient
    .select(
      "vaccination.id",
      "vaccine.name",
      "vaccination.date",
      "vaccination.schedule_date",
      "vaccination.batch",
      "vaccination.maker"
    )
    .from("tbl_vaccine as vaccine")
    .innerJoin(
      "tbl_vaccination as vaccination",
      "vaccine.id",
      "vaccination.id_vaccine"
    )
    .where("vaccination.id_person", req.user);

  const vaccinations = data
    .map((vaccination) => ({
      ...vaccination,
      date: formatDate(vaccination.date),
      schedule_date: formatDate(vaccination.schedule_date),
      status: getStatus(vaccination).status,
      order: getStatus(vaccination).order,
    }))
    .sort((a, b) => a.order - b.order);

  res.json(vaccinations);
};
