import { FormEvent } from "react";

export interface LoginForm extends FormEvent<HTMLFormElement> {
  username: HTMLInputElement;
  password: HTMLInputElement;
  passwordConfirmation?: HTMLInputElement;
}
