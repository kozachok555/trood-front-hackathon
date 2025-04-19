import { atom } from "jotai";
import { loadable } from "jotai/utils";
const API_URL = "/projects";
export const refreshTriggerAttom = atom(0);
const fetchProjects = atom(async (get) => {
  get(refreshTriggerAttom);
  const response = await fetch(API_URL);
  return response.json();
});
export const projectsAtom = loadable(fetchProjects)