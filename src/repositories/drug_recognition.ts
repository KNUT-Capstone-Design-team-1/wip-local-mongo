import fs from "fs";
import path from "path";
import {
  DRUG_RECOGNITION_MODEL,
  IDrugRecognition,
} from "../models/drug_recognition";

export class DrugRecognitionRepository {
  private readonly model: typeof DRUG_RECOGNITION_MODEL;
  private readonly resDirPath: string;

  constructor() {
    this.model = DRUG_RECOGNITION_MODEL;
    this.resDirPath = path.join(__dirname, "../../res/drug_recognition");
  }

  public async initializeCollection() {
    const resourceFileNames = this.getResourceFileNames();
    if (!resourceFileNames.length) {
      return;
    }

    for await (const fileName of resourceFileNames) {
      console.log(`read ${fileName}`);

      const resources = this.readResource(fileName);
      if (!resources.length) {
        console.log(`resource not exist in file ${fileName}`);
        continue;
      }

      console.log(`upsert resource ${fileName}`);
      await this.upsertMany(resources);
    }
  }

  private getResourceFileNames() {
    if (!fs.existsSync(this.resDirPath)) {
      console.log(`${this.resDirPath} is not exist`);
      return [];
    }

    const fileNames = fs.readdirSync(this.resDirPath);
    if (!fileNames.length) {
      console.log(`${this.resDirPath} is empty`);
      return [];
    }

    return fileNames;
  }

  private readResource(fileName: string): Array<IDrugRecognition> {
    return JSON.parse(
      fs.readFileSync(path.join(this.resDirPath, `/${fileName}`), "utf8")
    );
  }

  private async upsertMany(datas: Array<IDrugRecognition>) {
    for await (const data of datas) {
      await this.upsertOne(data);
    }
  }

  private async upsertOne(data: IDrugRecognition) {
    console.log(data);
    await this.model.updateOne({ ITEM_SEQ: data.ITEM_SEQ }, data, {
      new: true,
      upsert: true,
    });
  }
}
