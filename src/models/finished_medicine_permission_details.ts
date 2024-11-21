import { model, Schema } from "mongoose";

/**
 * 완제 의약품 허가 상세 데이터
 */

export interface IFinishedMedicinePermissionDetails {
  ITEM_SEQ: string; // 품목 일련 번호
  ITEM_NAME: string; // 품목명
  ENTP_NAME: string; // 업체명
  ITEM_PERMIT_DATE: string; // 허가 일자
  CNSGN_MANUF: string; // 위탁제조업체
  ETC_OTC_CODE: string; // 전문일반
  CHART: string; // 성상
  BAR_CODE: string; // 표준코드
  MATERIAL_NAME: string; // 원료 성분
  EE_DOC_ID: string; // 효능 효과 URL
  UD_DOC_ID: string; // 용법 용량 URL
  NB_DOC_ID: string; // 주의사항 URL
  INSERT_FILE: string; // 첨부 문서 URL
  VALID_TERM: string; // 유효 기간
  STORAGE_METHOD: string; // 저장 방법
  REEXAM_TARGET: string; // 재심사 대상
  REEXAM_DATE: string; // 재심사 기간
  PACK_UNIT: string; // 포장 단위
  EDI_CODE: string; // 보험 코드
  PERMIT_KIND: string; // 신고/허가구분
  ENTP_NO: string; // 업 허가 번호
  NARCOTIC_KIND: string; // 마약 종류 코드
  NEWDRUG_CLASS_NAME: string; // 신약
  INDUTY_TYPE: string; // 업종 구분
  MAIN_ITEM_INGR: string; // 주성분명
  INGR_NAME: string; // 첨가제명
}

const FinishedMedicinePermissionDetailsSchema =
  new Schema<IFinishedMedicinePermissionDetails>(
    {
      ITEM_SEQ: { type: String, require: true, unique: true },
      ITEM_NAME: { type: String, require: true },
      ENTP_NAME: { type: String, require: true },
      ITEM_PERMIT_DATE: String,
      CNSGN_MANUF: String,
      ETC_OTC_CODE: String,
      CHART: String,
      BAR_CODE: String,
      MATERIAL_NAME: String,
      EE_DOC_ID: String,
      UD_DOC_ID: String,
      NB_DOC_ID: String,
      INSERT_FILE: String,
      VALID_TERM: String,
      STORAGE_METHOD: String,
      REEXAM_TARGET: String,
      REEXAM_DATE: String,
      PACK_UNIT: String,
      EDI_CODE: String,
      PERMIT_KIND: String,
      ENTP_NO: String,
      NARCOTIC_KIND: String,
      NEWDRUG_CLASS_NAME: String,
      INDUTY_TYPE: String,
      MAIN_ITEM_INGR: String,
      INGR_NAME: String,
    },
    { collection: "FinishedMedicinePermissionDetails" }
  );

export const FinishedMedicinePermissionDetailsModel =
  model<IFinishedMedicinePermissionDetails>(
    "FinishedMedicinePermissionDetails",
    FinishedMedicinePermissionDetailsSchema
  );
