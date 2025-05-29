const userStatsDetails = require("../model/userstats");

const getUserStats = async (req, res) => {
  try {
    const { user } = req.query;
    const userStats = await userStatsDetails.findOne({ username: String(user) });
    if (!userStats) {
      return res.status(404).json({ message: "User stats does not exist" });
    }
    return res.status(200).json(userStats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserStats = async (req, res) => {
  try {
    const { user } = req.query; // logged-in user's username
    const { bookmarks, solved, action } = req.body; // action: "add" or "remove"
    if (!user) {
      return res.status(400).json({ message: "User query parameter is required" });
    }
    if (!action || (!bookmarks && !solved)) {
      return res.status(400).json({ message: "Action and field to update are required" });
    }

    // Build update object
    const update = {};
    // Update bookmarks if provided
    if (bookmarks) {
      if (action === "add") {
        update.$addToSet = { bookmarks: bookmarks };
      } else if (action === "remove") {
        update.$pull = { bookmarks: bookmarks };
      }
    }
    // Update solved if provided
    if (solved) {
      if (action === "add") {
        update.$addToSet = { solved: solved };
      } else if (action === "remove") {
        update.$pull = { solved: solved };
      }
    }
    
    // Use upsert: true so that if the document doesn't exist, it is created
    const result = await userStatsDetails.findOneAndUpdate(
      { username: user },
      update,
      { new: true, upsert: true }
    );
    
    return res.status(200).json({ message: "User stats updated successfully", data: result });
  } catch (error) {
    console.error("Error updating user stats:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserStats,
  updateUserStats,
};