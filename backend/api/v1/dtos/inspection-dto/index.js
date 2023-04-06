/**
 * @swagger
 *
 * components:
 *   schemas:
 *     InspectionDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         resource:
 *           type: object
 *           $ref: '#/components/schemas/ResourceDto' 
 *         conformity:
 *           type: integer
 *         items:
 *           type: array
 *             items:
 *              type: object
 *                $ref: '#/components/schemas/InspectedItemDto'
 *           
 */