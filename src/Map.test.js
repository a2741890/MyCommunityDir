import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId, waitForElement} from '@testing-library/react'
import {rest} from 'msw'
import { setupServer } from 'msw/native'
import Map from '../src/Container/Map/Map'

const server = setupServer(
  rest.get('http://localhost:8000/', (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(202, 'Mocked status'),
      ctx.json({
        clusters: 'Faked_Clusters'
      })
    )
  })
)

beforeAll(( () => server.listen()))
afterAll(() => server.resetHandlers())
afterAll(() => server.close())

test('Fetch API and load the map', async () => {
  render(<Map />)
  const mapEl = await screen.queryByTestId('mainMap')
  const clusterEl = await screen.queryByTestId('Cluster')
  const customMarkerEl = await screen.queryByTestId('customMarker')
  const defaultMarkerEl = await screen.queryByTestId('defaultMarker')

  expect(mapEl).toBeDefined()
  expect(clusterEl).toBeDefined()
  expect(customMarkerEl).toBeDefined()
  expect(defaultMarkerEl).toBeDefined()

})

test('Handle server exceptions', async () => {
  render(<Map />)
  let errorEl = await screen.queryByText('Network Error')
  expect(errorEl).toBeNull()
  
  
  server.use(
    rest.get('http://localhost:800/', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({message: 'Network error'})
    )})
  )
  render(<Map />)
  errorEl = await screen.queryByText('Network Error')
  expect(errorEl).toBeDefined()
})