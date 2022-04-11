import {serve} from "./deps.js";
import * as colors from "https://deno.land/std@0.134.0/fmt/colors.ts";

let name = Deno.args;

serve(() => new Response(`Hello ${name}`));

console.log(colors.bgBlue("http://localhost:8000/"));
