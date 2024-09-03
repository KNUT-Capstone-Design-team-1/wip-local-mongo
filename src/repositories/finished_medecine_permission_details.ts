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
    const resources = this.readResources();

    if (!resources.length) {
      return;
    }

    for (const resource of resources) {
      this.upsertOne(resource);
    }
  }

  private readResources(): Array<IFinishedMedicinePermissionDetails> {
    if (!fs.existsSync(this.resDirPath)) {
      console.log(`${this.resDirPath} is not exist`);
      return [];
    }

    const fileNames = fs.readdirSync(this.resDirPath);
    if (!fileNames.length) {
      console.log(`${this.resDirPath} is empty`);
      return [];
    }

    const resources: Array<IFinishedMedicinePermissionDetails> = [];

    for (const fileName of fileNames) {
      const resource = JSON.parse(
        fs.readFileSync(path.join(this.resDirPath, `/${fileName}`), "utf8")
      ) as IFinishedMedicinePermissionDetails;

      resources.push(resource);
    }

    return resources;
  }

  private upsertOne(data: IFinishedMedicinePermissionDetails) {
    this.model.updateOne({ ITEM_SEQ: data.ITEM_SEQ }, data, {
      new: true,
      upsert: true,
    });
  }
}
