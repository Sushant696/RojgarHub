export const apiURLs = {
  AUTH: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    verify: "/api/auth/verify",
    refresh: "/api/auth/refresh",
  },
  Jobs: {
    postJob: "/api/job/",
    deleteJob: "/api/job/",
    editJob: "/api/job/",
    get: "/api/job",
    getById: "/api/job/",
    toggleJob: "/api/job/toogle",
    candidates: "/api/job/candidates",
    applications: "/api/job/applications",
  },
  Employer: {
    getById: "/api/employer/",
    jobs: "/api/employer/jobs", // specific jobs
    candidates: "/api/employer/candidates", // all candidates
    applications: "/api/employer/applications", // all applications
  },
  Application: {
    applicationStatus: "/api/application/status",
    applicationById: "/api/application",
  },
};
