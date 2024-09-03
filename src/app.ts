import { connect } from "mongoose";
import { DrugRecognitionRepository } from "./repositories/drug_recognition";
import { FinishedMedecinePermissionDetailsRepository } from "./repositories/finished_medecine_permission_details";

async function main() {
  await connect("mongodb://127.0.0.1:27017/whatispill");

  const drugRecognitionRepository = new DrugRecognitionRepository();
  drugRecognitionRepository.initializeCollection();

  const finishedMedecinePermissionRepository =
    new FinishedMedecinePermissionDetailsRepository();
  finishedMedecinePermissionRepository.initializeCollection();
}

main();
