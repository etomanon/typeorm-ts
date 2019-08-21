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
    width: ["100%", "100%", "50rem"],
    widthHeader: ["auto", "auto", "50rem"]
  },
  {
    path: "size",
    name: "Velikost",
    width: ["100%", "100%", "25rem"],
    widthHeader: ["auto", "auto", "25rem"]
  }
];
