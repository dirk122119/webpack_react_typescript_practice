import { describe, expect, test } from '@jest/globals';
import filtersReducer, { statusFilterChanged } from "../src/feature/filiters/filtersSlice"
import userReducer, { statusUser,logoutUser } from "../src/feature/user/userSlice"
import todosReducer,{saveNewTodo} from "../src/feature/todos/todoSlice"


test("should return the filter reducer initial state", () => {
  expect(todosReducer(undefined, { type: undefined })).toEqual(
    { entities:{},ids:[],status: "idle" }
  )
});


test("should return the filter reducer initial state", () => {
  expect(filtersReducer(undefined, { type: undefined })).toEqual(
    { status: "all" }
  )
});

test("should return the filter reducer activate state", () => {
  expect(filtersReducer(undefined,statusFilterChanged("Active"))).toEqual(
    { status: "active" }
  )
});

test("should return the filter reducer completed state", () => {
  expect(filtersReducer(undefined,statusFilterChanged("Completed"))).toEqual(
    { status: "completed" }
  )
});

test("should return the userReducer initial state", () => {
  expect(userReducer(undefined, { type: undefined })).toEqual(
    { user: "guest" }
  )

});
test("loginfunction should return userReducer the admin state", async () => {
  expect(userReducer(undefined, statusUser("admin"))).toEqual(
    { user: "admin" }
  )
});
test("logoutfunction should return userReducer the guest state", async () => {
  expect(userReducer(undefined, logoutUser(""))).toEqual(
    { user: "guest" }
  )
});



