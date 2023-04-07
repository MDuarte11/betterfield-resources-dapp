/**
 * @swagger
 *
 * components:
 *   schemas:
 *     GetInspectionsResDto:
 *       type: object
 *       properties:
 *         inspectionIds:
 *           type: array
 *           items:
 *              type: string
 *          inspections:
 *           type: array
 *           items:
 *              type: object
 *                $ref: '#/components/schemas/InspectionDto' 
 */