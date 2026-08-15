import { HelpData } from "@/types/help";

export const helpData: HelpData = {
  categories: [
    {
      id: "products",
      title: "Products",
      description: "Manage inventory, pricing, stock levels, and product listings.",
      articles: [
        "How to search and filter products",
        "Understanding product availability status",
        "Updating product details from row actions",
      ],
    },
    {
      id: "users",
      title: "Users",
      description: "Browse users, review profiles, and update roles from the admin table.",
      articles: [
        "Viewing user profile details",
        "Editing user name and role",
        "Saving user changes locally",
      ],
    },
    {
      id: "recipes",
      title: "Recipes",
      description: "Track recipes, difficulty levels, ratings, and recipe metadata.",
      articles: [
        "Searching recipes by name or cuisine",
        "Viewing recipe details",
        "Editing recipe name, cuisine, and difficulty",
      ],
    },
    {
      id: "messages",
      title: "Messages",
      description: "Handle inbox conversations, unread counts, and customer replies.",
      articles: [
        "Searching conversations",
        "Reading and replying to messages",
        "Using the inbox on mobile and desktop",
      ],
    },
  ],
  faqs: [
    {
      id: "faq-1",
      categoryId: "products",
      question: "How do I find a product quickly?",
      answer:
        "Open the Products page and use the search bar to filter by product title. Pagination helps you browse larger result sets without leaving the page.",
    },
    {
      id: "faq-2",
      categoryId: "products",
      question: "What does the availability status mean?",
      answer:
        "Availability status reflects whether a product is currently in stock or unavailable. Use it to identify items that may need restocking.",
    },
    {
      id: "faq-3",
      categoryId: "users",
      question: "Can I edit a user's role?",
      answer:
        "Yes. Open the row actions menu on the Users table, choose Edit, update the name or role, and save. Changes are stored locally in your browser.",
    },
    {
      id: "faq-4",
      categoryId: "users",
      question: "Why do my user edits persist after refresh?",
      answer:
        "User edits are saved to localStorage so you can continue reviewing changes during development and demos without an API.",
    },
    {
      id: "faq-5",
      categoryId: "recipes",
      question: "How do I view recipe details?",
      answer:
        "Use the row actions menu in the Recipes table and select View. The dialog shows cuisine, difficulty, servings, calories, and tags.",
    },
    {
      id: "faq-6",
      categoryId: "recipes",
      question: "Can I filter recipes by cuisine?",
      answer:
        "Yes. The Recipes page search filters by recipe name and cuisine, making it easy to find specific collections.",
    },
    {
      id: "faq-7",
      categoryId: "messages",
      question: "How do unread messages work?",
      answer:
        "Unread conversations show a badge in the inbox list. Selecting a conversation marks it as read and updates the unread count.",
    },
    {
      id: "faq-8",
      categoryId: "messages",
      question: "Can I reply from the inbox?",
      answer:
        "Yes. Select a conversation, type your reply in the message input, and send. Replies update the local mock conversation state immediately.",
    },
  ],
};
