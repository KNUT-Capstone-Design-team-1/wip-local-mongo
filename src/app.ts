import { connect } from "mongoose";
import { DrugRecognitionRepository } from "./repositories/drug_recognition";
import { FinishedMedicinePermissionDetailsRepository } from "./repositories/finished_medicine_permission_details";

async function main() {
  console.log("connect DB");
  await connect("mongodb://127.0.0.1:27017/whatispill");

  console.log("initialize DrugRecognition");

  const drugRecognitionRepository = new DrugRecognitionRepository();
  await drugRecognitionRepository.initializeCollection();

  console.log("initialize finishedMedicinePermission");

  const finishedMedicinePermissionRepository =
    new FinishedMedicinePermissionDetailsRepository();
  await finishedMedicinePermissionRepository.initializeCollection();

  console.log("initialize complete");
}

main();
