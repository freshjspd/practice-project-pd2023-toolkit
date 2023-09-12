const request = require('supertest');
const { expect } = require('chai');
const yup = require('yup');
const app = require('./../app');

// request(app)
// .method('/path')
// .set('Header','value') - установка заголовков
// .send(тело) – установка тела запроса
// .expect('Header','value') – проверка заголовка, пришедшего с ответом
// .expect(statusCode) – проверка статус-кода ответа
// .expect('Response') – проверка тела ответа

// .end(done)
// или
// .end((err,res)=>{
// if(err) {return done(err)}
// проверка res.body
// done()
// })
// или
// .then(res=>{ проверка res.body; done()})
// .catch(err=>done(err))

const userCredentials = { email: 'customer@mail.com', password: '123456' };

const TOKEN_VALIDATION_SCHEMA = yup.object({
  token: yup
    .string()
    .matches(/^(\w|-)+\.(\w|-)+\.(\w|-)+$/)
    .required(),
});

describe('Testing app', () => {
  describe('Testing public endpoints', () => {
    describe('POST /login', () => {
      it('response should be 200 {token: "sfsdf.sdfdf.dgtr"} Content-Type json when valid login/passw (user exists)', (done) => {
        request(app)
          .post('/login')
          .send(userCredentials)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            console.log('res.body :>> ', res.body);
            expect(TOKEN_VALIDATION_SCHEMA.isValidSync(res.body)).to.be.true;
            done();
          })
          .catch((err) => done(err));
      });
      it('response should be 400 "Invalid data for login" when invalid login/email', (done) => {
        request(app)
          .post('/login')
          .send({ email: 'qwerty', password: 'qwerty' })
          .expect(400)
          .expect('Invalid data for login')
          .end(done);
      });
      it('response should be 404 "user with this data didn`t exist" when login/passw is valid? but user doesn`t exist', (done) => {
        request(app)
          .post('/login')
          .send({ email: 'qwerty@mail.com', password: 'qwerty' })
          .expect(404)
          .expect('user with this data didn`t exist')
          .end(done);
      });
    });
  });
  describe('Testing private endpoints', () => {});
});
