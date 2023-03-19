import User from "../mongodb/models/user.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        const userExists = await User.findOne({ email: email });
        if (userExists) return res.status(200).json(userExists);

        const newUser = await User.create({ name, email, avatar });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id })
            .populate("allRecipes")
            .populate("savedRecipes")
            .populate({
                path: "mealPlan",
                populate: {
                    path: "recipes",
                } 
            });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, avatar, allRecipes, savedRecipes, mealPlan, shoppingList } =
            req.body;

        // console.log(req.body);
        // console.log(savedRecipes.map(({ _id }) => _id));

        await User.findByIdAndUpdate(
            { _id: id },
            {
                name,
                email,
                avatar,
                allRecipes: allRecipes.map(({ _id }) => _id),
                savedRecipes: savedRecipes.map(({ _id }) => _id),
                mealPlan,
                shoppingList,
            }
        );

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllUsers, createUser, getUserInfoById, updateUserInfoById };
