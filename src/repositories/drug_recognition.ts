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
    const resources = this.readResources();

    if (!resources.length) {
      return;
    }

    for (const resource of resources) {
      this.upsert(resource);
    }
  }

  private readResources(): Array<IDrugRecognition> {
    if (!fs.existsSync(this.resDirPath)) {
      console.log(`${this.resDirPath} is not exist`);
      return [];
    }

    const fileNames = fs.readdirSync(this.resDirPath);
    if (!fileNames.length) {
      console.log(`${this.resDirPath} is empty`);
      return [];
    }

    const resources: Array<IDrugRecognition> = [];

    for (const fileName of fileNames) {
      const resource = JSON.parse(
        fs.readFileSync(path.join(this.resDirPath, `/${fileName}`), "utf8")
      ) as IDrugRecognition;

      resources.push(resource);
    }

    return resources;
  }

  private upsert(data: IDrugRecognition) {
    this.model.updateOne({ ITEM_SEQ: data.ITEM_SEQ }, data, {
      new: true,
      upsert: true,
    });
  }
}
