export const apiURLs = {
  AUTH: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    verify: "/api/auth/verify",
    refresh: "/api/auth/refresh",
    update: "/api/auth/update",
  },
  Jobs: {
    postJob: "/api/job/",
    deleteJob: "/api/job/",
    editJob: "/api/job/",
    get: "/api/job",
    getById: "/api/job/",
    getByIdPublic: "/api/job/public",
    toggleJob: "/api/job/toogle",
    candidates: "/api/job/candidates",
    applications: "/api/job/applications",
    search: "/api/job/search",
  },
  Employer: {
    getById: "/api/employer/",
    jobs: "/api/employer/jobs", // specific jobs
    candidates: "/api/employer/candidates", // all candidates
    applications: "/api/employer/applications", // all applications
    update: "/api/employer",
    visualization: "/api/employer/visulizationData",
  },
  Candidate: {
    getById: "/api/candidate/",
    jobs: "/api/candidate/jobs", // candidate specific jobs
    applications: "/api/candidate/applications", // all candidate applications
    update: "/api/candidate/update",
    dashboardData: "/api/candidate/vizData",
  },
  Application: {
    createApplication: "/api/application/create",
    applicationStatus: "/api/application/status",
    applicationById: "/api/application",
    interviewSchedule: "/api/application/interview",
    deleteInterview: "/api/application/interview",
    updateInterview: "/api/application/interview",
  },
};
