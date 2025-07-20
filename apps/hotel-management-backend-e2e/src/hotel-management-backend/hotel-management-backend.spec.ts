// apps/hotel-management-backend-e2e/src/hotel.e2e-spec.ts
import axios from 'axios';

describe('GraphQL Hotel CRUD (e2e)', () => {

  let hotelId: number;
  const URL = '/graphql'
 

  it('1) creates a hotel', async () => {
    const mutation = `
      mutation {
        createHotel(input: {
          name: "E2E Hotel",
          location: "Test City",
          description: "E2E Description"
        }) {
          id name location
        }
      }
    `;
    const res = await axios.post(URL, { query: mutation });
    expect(res.status).toBe(200);
    expect(res.data.errors).toBeUndefined();
    const created = res.data.data.createHotel;
    expect(created.name).toBe('E2E Hotel');
    hotelId = created.id;
  });

  it('2) reads the hotel by ID', async () => {
    const query = `query { hotel(id: ${hotelId}) { id name location } }`;
    const res   = await axios.post(URL, { query });
    expect(res.status).toBe(200);
    expect(res.data.errors).toBeUndefined();
    expect(res.data.data.hotel.id).toBe(hotelId);
  });

  it('3) lists all hotels', async () => {
    const query = `query { hotels { id name } }`;
    const res   = await axios.post(URL, { query });
    expect(res.status).toBe(200);
    expect(res.data.errors).toBeUndefined();
    const list = res.data.data.hotels;
    expect(Array.isArray(list)).toBe(true);
    expect(list.some(h => h.id === hotelId)).toBe(true);
  });

  it('4) updates the hotel', async () => {
    const mutation = `
      mutation {
        updateHotel(
          id: ${hotelId},
          input: { name: "Updated Hotel", location: "Updated City", description: "Updated" }
        ) {
          id name location
        }
      }
    `;
    const res = await axios.post(URL, { query: mutation });
    expect(res.status).toBe(200);
    expect(res.data.errors).toBeUndefined();
    expect(res.data.data.updateHotel.name).toBe('Updated Hotel');
  });

  it('5) deletes the hotel', async () => {
    const mutation = `
      mutation {
        deleteHotel(id: ${hotelId}) { id }
      }
    `;
    const res = await axios.post(URL, { query: mutation });
    expect(res.status).toBe(200);
    expect(res.data.errors).toBeUndefined();
    expect(res.data.data.deleteHotel.id).toBe(hotelId);
  });

 
});
