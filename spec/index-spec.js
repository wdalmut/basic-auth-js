const using = require('jasmine-data-provider');

const basic = require('../src');

describe("Basic Auth", () => {
  using([
    {headers:{authorization: "Basic dGVzdDpoZWxsbw=="}},
    {headers:{authorization: "basic dGVzdDpoZWxsbw=="}},
  ], (req) => {
    it("should call the authenticate method", (done) => {
      basic((username, password) => {
        return Promise.resolve({ username, password });
      })(req).then((data) => {
        expect(data).toEqual({ username: 'test', password: 'hello' });
        done();
      })
    });
  });

  using([
    {headers:{authorization: "Basic kill!me"}},
    {headers:{authorization: "smethingstrng"}},
    {headers:{authorization: "Bearer 19358712951298"}},
    {headers:{authorization: "Bearer dGVzdDpoZWxsbw=="}},
    {headers:{authorization: "Basic TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4="}},
  ], (req) => {
    it("should reject the promise on failures", (done) => {
      basic(() => {})(req)
        .catch((err) => {
          expect(err).toEqual({error: "Invalid basic auth token form"});
          done();
        });
    });
  });
});
