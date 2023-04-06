/**
 * @swagger
 *
 * components:
 *   schemas:
 *     UpdateInspectionReqDto:
 *       type: object
 *       properties:
 *         smartContractAddress:
 *           type: string
 *         resourceId:
 *           type: string
 *         inspectionId:
 *           type: string
 *         type:
 *           type: object
 *           $ref: '#/components/schemas/InspectionDto' 
 */