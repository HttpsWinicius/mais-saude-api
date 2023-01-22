import { dbClient } from "../../config/database.js";
import dayjs from "dayjs";
import axios from "axios";

export const updateVaccination = async (req, res) => {
  try {
    await dbClient("tbl_vaccination")
      .where(
        "id_person",
        "=",
        req.user,
        "id_vaccine",
        "=",
        req.body.idVaccine
      )
      .update({
        date: req.body.date,
      });

    const resultVaccine = await getPeriodicity(req.body.idVaccine);
    const schedule_date = dayjs(req.body.date).add(resultVaccine.periodicity, 'day').format('YYYY-MM-DD');
    const resultPerson = await getNamePerson(req.user);

    await dbClient("tbl_vaccination").insert({
      id_person: req.user,
      id_vaccine: req.body.idVaccine,
      schedule_date
    })

    await sendSms(resultPerson.name, resultVaccine.name, schedule_date, resultPerson.phone);

    res.status(200).json("Success");
  } catch (e) {
    console.log(e.message);
    res.status(500).json("Error updated", e.message);
  }
};


const sendSms = async (namePerson, nameVaccine, scheduleDate, telephone) => {

  scheduleDate = dayjs(scheduleDate).format('DD/MM/YYYY');

  const textMessage = "Atenção!! " + namePerson + ", sua proxima vacina de " + nameVaccine
    + " foi agendada para " + scheduleDate
    + " mais não se preocupe, te lembraremos no dia.";

  var data = JSON.stringify({
    "numberPhone": telephone,
    "message": textMessage,
    "flashSms": true
  });

  var config = {
    method: 'post',
    url: 'https://api.nvoip.com.br/v2/sms?napikey=MGlJQWpsbjVSSkQ5NWxNSEwzMWtUNWNPOElHT05naGU=',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

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

  res.json(data);
};
