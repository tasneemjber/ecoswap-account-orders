import { initialUserProfile } from "../data/mockData";

const USERS_STORAGE_KEY = "ecoswap_users";
const CURRENT_USER_STORAGE_KEY = "ecoswap_user";

const normalizeEmail = (email) => (email || "").trim().toLowerCase();

const createUser = ({ name, email, phone, password }) => ({
  id: `USR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  name: (name || "").trim(),
  email: normalizeEmail(email),
  phone: (phone || "").trim(),
  password,
  address: initialUserProfile.address,
  avatar: initialUserProfile.avatar,
  bio: initialUserProfile.bio,
  memberSince: initialUserProfile.memberSince,
  sellerRating: initialUserProfile.sellerRating,
  reviewsCount: initialUserProfile.reviewsCount,
  sustainabilityBadge: initialUserProfile.sustainabilityBadge,
});

const seedDefaultUser = () => {
  const defaultUser = createUser({
    name: initialUserProfile.name,
    email: initialUserProfile.email,
    phone: initialUserProfile.phone,
    password: "password123",
  });

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([defaultUser]));
  return defaultUser;
};

export const getStoredUsers = () => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) return [seedDefaultUser()];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [seedDefaultUser()];
    }
    return parsed;
  } catch (error) {
    console.error("Failed to load stored users", error);
    return [seedDefaultUser()];
  }
};

export const saveUsers = (users) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load current user", error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
};

export const registerUser = ({ name, email, phone, password }) => {
  const trimmedName = (name || "").trim();
  const normalizedEmail = normalizeEmail(email);
  const trimmedPhone = (phone || "").trim();

  if (!trimmedName || !normalizedEmail || !trimmedPhone || !password) {
    throw new Error("Please fill in all fields.");
  }

  const users = getStoredUsers();
  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = createUser({ name: trimmedName, email: normalizedEmail, phone: trimmedPhone, password });
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  setCurrentUser(newUser);
  return newUser;
};

export const loginUser = ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw new Error("Please fill in both email and password.");
  }

  const users = getStoredUsers();
  const matchedUser = users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail && user.password === password
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password.");
  }

  setCurrentUser(matchedUser);
  return matchedUser;
};
