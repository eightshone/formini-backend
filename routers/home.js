const express = require("express");

const router = express.Router();

router.get("/home", async (req, res) => {
    res.status(200).send({ data: {
        description: "Notre centre de formation est lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et maximus erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur quis aliquet turpis. Nullam tempus pulvinar mauris. Proin nec consequat leo. Sed at ultrices tortor. Vivamus molestie elementum massa id dictum. Proin vitae ligula metus. Vivamus sed sagittis quam, et fringilla sem. Phasellus eu magna maximus, imperdiet purus id, interdum enim. Donec semper elit quam, ut vulputate libero ullamcorper ac. Donec eget dignissim erat, quis mattis lacus.",
        courses: [
            {
                id: "1",
                name: "React for dummies",
                category: "Web Development",
                description: "React is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.",
                slug: "react-for-dummies",
                cover_url: "https://reactjs.org/logo-og.png" 
            },
            {
                id: "2",
                name: "Angular for dummies",
                category: "Web Development",
                description: "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.",
                slug: "angular-for-dummies",
                cover_url: "https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography.png" 
            },
            {
                id: "3",
                name: "UI design with Sketch",
                category: "Design",
                description: "Sketch is a vector graphics editor for macOS developed by the Dutch company Sketch B.V. It was first released on 7 September 2010 and won an Apple Design Award in 2012. It is primarily used for user interface and user experience design of websites and mobile apps and does not include print design features.",
                slug: "sketch-ui-design",
                cover_url: "https://www.elegantthemes.com/blog/wp-content/uploads/2019/08/sketch-app-review-featured-image.jpg"
            },
        ]
    } });
});

module.exports = router;