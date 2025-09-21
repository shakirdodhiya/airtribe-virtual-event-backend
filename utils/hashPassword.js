const bcrypt = require('bcrypt');

exports.hashPassword = async (password_string) => {
  const hashedPassword = await bcrypt.hash(password_string, parseInt(process.env.PASSWORD_COST_FACTOR));

  return hashedPassword;
}