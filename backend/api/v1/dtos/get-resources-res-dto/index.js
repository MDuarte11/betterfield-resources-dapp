/**
 * @swagger
 *
 * components:
 *   schemas:
 *     GetResourcesResDto:
 *       type: object
 *       properties:
 *         resourceIds:
 *           type: array
 *           items:
 *              type: string
 *          resources:
 *           type: array
 *           items:
 *              type: object
 *                $ref: '#/components/schemas/ResourceDto' 
 */