import {nameSearcher} from './index'
// describe('test Star Trek name search', ()=>{
//   test.todo('handle empty strings')
//   test.todo('handle long strings >64')
//   test.todo('handle offline status')
//   test.todo('handle too many results')
//   test.todo('handle illegal characters')
// })

describe('test Star Trek name search', ()=>{
  it('handle empty strings', ()=>{
    expect(nameSearcher("")).toThrowError()
  })
  test.todo('handle long strings >64')
  test.todo('handle offline status')
  test.todo('handle too many results')
  test.todo('handle illegal characters')
})