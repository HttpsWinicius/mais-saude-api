export default class PersonRepository {
  constructor(dbClient) {
    this.dbClient = dbClient;
    this.table = "tbl_person";
  }

  async findById(id) {
    this.dbClient(this.table).where();
  }
}
