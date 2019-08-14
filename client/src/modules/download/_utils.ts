export interface DataProps {
  name: string;
  path: string;
  type: "file" | "directory";
  size: string;
}

export const columns = [
  {
    path: "name",
    name: "Název",
    width: ["100%", "30rem"]
  },
  {
    path: "size",
    name: "Velikost",
    width: ["100%", "25rem"]
  }
];
