export default class PersonRepository {
  constructor(dbClient) {
    this.dbClient = dbClient;
    this.table = "tbl_person";
  }

  async findById(id) {
    const person = await this.dbClient(this.table).where("id", id);
  }
}
