import { Schema, model } from "mongoose";

export const USER_ROLES = ["admin", "moderator", "user"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const getFullName = (firstName?: string | null, lastName?: string | null) =>
  [firstName, lastName]
    .map((part) => (part ? String(part).trim() : ""))
    .filter(Boolean)
    .join(" ");

export const splitFullName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
};

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret) {
        const user = ret as Record<string, unknown>;
        const firstName =
          typeof user.firstName === "string" ? user.firstName.trim() : "";
        const lastName =
          typeof user.lastName === "string" ? user.lastName.trim() : "";
        const legacyName =
          typeof user.name === "string" ? user.name.trim() : "";
        const parts =
          firstName || lastName
            ? { firstName, lastName }
            : splitFullName(legacyName);

        user.id = String(user._id);
        user.firstName = parts.firstName;
        user.lastName = parts.lastName;
        user.name = getFullName(parts.firstName, parts.lastName);
        user.emailVerified = user.emailVerified === true;
        delete user._id;
        delete user.passwordHash;
        delete user.emailVerificationTokenHash;
        delete user.emailVerificationExpiresAt;
      },
    },
  }
);

userSchema.pre("validate", function () {
  const firstName = this.get("firstName");
  const lastName = this.get("lastName");
  const name = this.get("name");

  if ((!firstName || !lastName) && typeof name === "string" && name.trim()) {
    const parts = splitFullName(name);
    if (!firstName) {
      this.set("firstName", parts.firstName);
    }
    if (!lastName) {
      this.set("lastName", parts.lastName || parts.firstName);
    }
  }

  this.set(
    "name",
    getFullName(this.get("firstName"), this.get("lastName"))
  );
});

export const User = model("User", userSchema);
