// You do NOT need to modify this file.
// You should just run the tests to see if your code passes or fails.

const app = require("./app")
// supertest is a 3rd party library used to simulate navigating to a server endpoint
const request = require("supertest")

// get the list of profiles
let profilesList = require("./data")

// ---------
// NOTE:  The test case is designed to explain jest/supertest syntax
// It is NOT part of the final assessment
// JEST:  describe() and it() summarize the name of the test case and its expected output
// ---------
describe("Testing the / endpoint", () => {
    it("should respond with 200", (done) => {

        // SUPERTEST: supertest is initiating the request to our "server"
        return request(app).get('/')            
            .then(
                // SUPERTEST: After connecting to the "/", supertest will send back
                // the server response in a "response" callback variable
                (response) => {          
                    
                    // ------------------
                    // JEST:  Here are the actual "tests" you want to run
                    //  - Test #1: Check to see if the status code is 200
                    //  - Test #2: Check if you got the "Welcome to our page" message
                    // ------------------
                    
                    // Test #1: Check to see if the status code is 200
                    // You are comparing the actual output to the expected output
                    expect(response.status).toBe(200)        
                    
                    // Test #2: Check if you got the "Welcome to our page" message                    
                    // response.text contains the text of the website                    
                    expect(response.body.msg).toBe("Welcome to our page!")                    
                    
                    // JEST: Notify JEST that the test is done
                    done()
                }
            )
            .catch(
                (err) => {
                    // The done function is from jest
                    done(err)
                }
            )
    })
    
})


// ----------------
// The actual test cases for your dating app endpoint s
// ----------------

// 1. Testing the API's GET Endpoint
// Test cases:
// - If user does NOT specify a city, then return a list of all profiles
// - If user specifies a city, then return a list of profiles from that city
describe("Testing the GET endpoint", () => {
    it("If no city is provided, return all profiles", (done) => {
        return request(app).get("/api/profiles")            
            .then(                
                (response) => {
                    expect(response.status).toBe(200)                       
                    expect(response.body.length).toEqual(profilesList.length);                    
                    expect(response.body).toEqual(expect.arrayContaining(profilesList))
                    done()
                }
            )
            .catch(
                (err) => {                    
                    done(err)
                }
            )
    })
    it("Providing a city returns a list of matching profiles", (done) => {
        const cityName = "Toronto"
        return request(app).get(`/api/profiles/${cityName}`)
            .then(                
                (response) => {          
                    expect(response.status).toBe(200)        
                    const matchingProfiles = profilesList.filter((profile) => profile.city === cityName)                    
                    expect(response.body.length).toBe(matchingProfiles.length)                     
                    expect(response.body).toEqual(expect.arrayContaining(matchingProfiles))
                    done()
                }
            )
            .catch(
                (err) => {                    
                    done(err)
                }
            )
    })
    
})

// 2. Test cases for the API's POST endpoint
// - Inserting a new profile
describe("Testing the POST endpoint", () => {    
    it("Inserting a new user", (done) => {     
        // Adding Thor to our fake dating app.   
        const profileData = {name: "Thor", age:"350", occupation: "Hero and Adventurer", city:"Aasgard"}
        return request(app).post("/api/profiles").send(profileData)            
            .then(
                (response) => {          
                    expect(response.status).toBe(201)        
                    expect(response.body.msg).toBe("Created")
                    expect(response.body.inserted).toMatchObject(profileData)
                    done()
                }
            )
            .catch(
                (err) => {
                    done(err)
                }
            )
    })
})



// 3. Test cases for the API's Delete endpoint
// - If the user tries to hit the DELETE endpoint, generate an error
describe("Testing the DELETE endpoint", () => {
    it("Response should contain 501 Not Implemented", (done) => {        
        return request(app).delete("/api/profiles")            
            .then(
                (response) => {          
                    expect(response.status).toBe(501)        
                    expect(response.body.msg).toBe("Not Implemented")
                    done()
                }
            )
            .catch(
                (err) => {
                    done(err)
                }
            )
    })    
})