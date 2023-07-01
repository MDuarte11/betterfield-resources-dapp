/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ResourceDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         location:
 *           type: string
 *         type:
 *           type: object
 *           $ref: '#/components/schemas/ResourceTypeDto'
 *         additionalData:
 *           type: string
 */