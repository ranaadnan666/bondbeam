const jobsCategory = [
    { id: 1,title: "Software Engineer" },
    { id: 2,title: "Marketing Manager"},
    { id: 3,title: "Accountant" },
    { id: 4,title: "Human Resources Manager" },
    { id: 5,title: "Software Engineer"},
    { id: 6,title: "Database Administrator" },
    { id: 7,title: "Network Administrator" },
    { id: 8,title: "Cybersecurity Analyst" },
    { id: 9,title: "Construction Manager" },
    { id: 10,title: "Civil Engineer" },
    { id: 11,title: "Architect" },
    { id: 12,title: "Electrician" },
    { id: 13,title: "Project Manager" },
    { id: 14,title: "Construction Manager" },
    { id: 15,title: "Site Supervisor" },
    { id: 16,title: "Carpenter" },
    { id: 17,title: "Electrician" },
    { id: 18,title: "Plumber" },
    { id: 19,title: "Structural Engineer" },
    { id: 20,title: "Geotechnical Engineer" },
    { id: 21,title: "Environmental Engineer" },
    { id: 22,title: "Transportation Engineer" },
    { id: 23,title: "Water Resources Engineer" },
    { id: 24,title: "Construction Manager" },
    { id: 25,title: "Construction Project Manager" },
    { id: 26,title: "Construction Engineer"},
    { id: 27,title: "Estimator" },
    { id: 28,title: "Field Engineer" },
    { id: 29,title: "Building Information Modeling (BIM) Coordinator" },
    { id: 30,title: "Sustainability Engineer"}
  ];

  export default jobsCategory;
  


//   import React, { useState } from "react";

// const JobSearch = () => {
//   // Define an array of job titles
//   const [jobs, setJobs] = useState([
//     "Project Manager",
//     "Construction Manager",
//     "Site Supervisor",
//     "Carpenter",
//     "Electrician",
//     "Plumber"
//   ]);

//   // Define a state variable for the user's input
//   const [input, setInput] = useState("");

//   // Define a function to update the input state variable
//   const handleInputChange = event => {
//     setInput(event.target.value);
//   };

//   // Define a function to suggest jobs based on the user's input
//   const suggestJobs = () => {
//     // Filter the array of job titles based on the user's input
//     const suggestedJobs = jobs.filter(
//       job => job.toLowerCase().includes(input.toLowerCase())
//     );

//     // Return the suggested job titles as a list of items
//     return suggestedJobs.map((job, index) => (
//       <li key={index}>{job}</li>
//     ));
//   };

//   return (
//     <div>
//       <input type="text" value={input} onChange={handleInputChange} />
//       <ul>{suggestJobs()}</ul>
//     </div>
//   );
// };

// export default JobSearch;
// In this example, we define a stateful component called JobSearch. Inside this component, we first define an array of job titles and a state variable for the user's input. We then define a function to update the input state variable whenever the user types in the search bar.

// Next, we define a function called suggestJobs that filters the array of job titles based on the user's input and returns the suggested job titles as a list of items. Finally, we render the search bar and the suggested job titles as an unordered list.

// Note that this is just an example and you may need to modify the code to fit your specific use case. Also, this example only suggests job titles based on the user's input, but you may need to add more functionality, such as displaying job details when the user clicks on a suggested job title.




