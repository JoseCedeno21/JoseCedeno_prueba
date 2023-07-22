
// Pruebas Unitarias para endpoint Get de metricas 
import server from "../src/server";
import request from 'supertest'


describe('GET /api/metrics', () => {
  const app = server.listen(8080)

  //Escenario 1: Obtener métricas de repositorios por tribu
  it('should return 200 & valid response', async () => {
    const result = await request(app).get('/api/metrics/884242126521925633');
    expect(result.status).toBe(200);
    expect(result.body.payload).toMatchObject(expect.objectContaining({
      repositories: expect.arrayContaining([expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        tribe: expect.any(String),
        organization: expect.any(String),
        coverage: expect.any(String),
        codeSmells: expect.any(Number),
        bugs: expect.any(String),
        vulnerabilities: expect.any(String),
        hotspots: expect.any(String),
        verificationState: expect.any(String),
        state: expect.any(String)
      })])
    }))
  })

  //Escenario 2: Cuando el id de tribu no existe 
  it('should return 404 & error message when id tribe dont exist', async () => {
    const result = await request(app).get('/api/metrics/884242126521921234');
    expect(result.status).toBe(404);
    expect(result.body).toMatchObject({error: 'La Tribu no se encuentra registrada'})
  })

  //Escenario 3: Obtener métricas de repositorios por tribu y verificar que el estado de verificación sea correcto
  it('should return 200 & valid response with a natural text as status', async () => {
    const result = await request(app).get('/api/metrics/884242126521925633');
    console.log('ya tetrmno', result.body)
    const aceptedValues = ['Verificado', 'En espera', 'Aprobado']
    const flag = result.body.payload.repositories.some((item: any) => !aceptedValues.includes(item.verificationState))
    expect(result.status).toBe(200);
    expect(flag).toBe(false)
  })
  
  //Escenario 4: La tribu no tiene repositorios que cumplan con la cobertura, usado 95% para esta prueba 
  it('should return 404 & error message when tribe has not repository with covertury', async () => {
    const result = await request(app).get('/api/metrics/884242126521925633?coverage=0.95');
    expect(result.status).toBe(404);
    expect(result.body).toMatchObject({error: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria'})
  })
  
})

