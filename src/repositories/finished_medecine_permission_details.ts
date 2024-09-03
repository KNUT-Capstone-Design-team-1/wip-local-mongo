import fs from "fs";
import path from "path";
import {
  FinishedMedicinePermissionDetailsModel,
  IFinishedMedicinePermissionDetails,
} from "../models/finished_medecine_permission_details";

export class FinishedMedecinePermissionDetailsRepository {
  private readonly model: typeof FinishedMedicinePermissionDetailsModel;
  private readonly resDirPath: string;

  constructor() {
    this.model = FinishedMedicinePermissionDetailsModel;
    this.resDirPath = path.join(
      __dirname,
      "../../res/finished_medecine_permission_details"
    );
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

  private readResource(fileName: string): Array<IFinishedMedicinePermissionDetails> {
    return JSON.parse(
      fs.readFileSync(path.join(this.resDirPath, `/${fileName}`), "utf8")
    );
  }

  private async upsertMany(datas: Array<IFinishedMedicinePermissionDetails>) {
    for await (const data of datas) {
      await this.upsertOne(data);
    }
  }

  private async upsertOne(data: IFinishedMedicinePermissionDetails) {
    await this.model.updateOne({ ITEM_SEQ: data.ITEM_SEQ }, data, {
      new: true,
      upsert: true,
    });
  }
}
