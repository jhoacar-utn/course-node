const EmojiModel = require('../models/emojiModel');

module.exports.votes = async (req, res) => {
  const { id } = req.body;

  try {
    const emoji = await EmojiModel.findByIdAndUpdate(id, {
      $inc: {
        votes: 1,
      },
    });

    res.json({
      result: emoji,
    });
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};
