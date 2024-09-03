import { connect } from "mongoose";
import { DrugRecognitionRepository } from "./repositories/drug_recognition";
import { FinishedMedecinePermissionDetailsRepository } from "./repositories/finished_medecine_permission_details";

async function main() {
  console.log("connect DB");
  await connect("mongodb://127.0.0.1:27017/whatispill");

  console.log("initialize DrugRecognition");

  const drugRecognitionRepository = new DrugRecognitionRepository();
  drugRecognitionRepository.initializeCollection();

  console.log("initialize FinishedPer");

  const finishedMedecinePermissionRepository =
    new FinishedMedecinePermissionDetailsRepository();
  finishedMedecinePermissionRepository.initializeCollection();

  console.log("initialize complete");
}

main();
