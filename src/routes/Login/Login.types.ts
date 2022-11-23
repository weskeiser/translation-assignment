import { FormEvent } from "react";

export interface AuthForm extends FormEvent<HTMLFormElement> {
  username: HTMLInputElement;
}
