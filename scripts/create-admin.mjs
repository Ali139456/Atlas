#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });

const ROUNDS = 12;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const username = process.env.ADMIN_USERNAME?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

if (!username || !password) {
  console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const { data: existing, error: lookupError } = await supabase
    .from("admins")
    .select("id, username")
    .eq("username", username)
    .maybeSingle();

  if (lookupError) throw lookupError;

  if (existing) {
    console.log(`Admin "${username}" already exists (id: ${existing.id}). No changes made.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, ROUNDS);

  const { data, error } = await supabase
    .from("admins")
    .insert({
      username,
      password_hash: passwordHash,
      display_name: username,
      is_active: true,
    })
    .select("id, username")
    .single();

  if (error) throw error;

  console.log(`Created admin "${data.username}" (id: ${data.id}).`);
}

main().catch((err) => {
  console.error("\nCreate admin failed:", err.message ?? err);
  process.exit(1);
});
