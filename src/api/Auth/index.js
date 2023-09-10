import API from "../Base";

const AuthAPI = {
    login: ({ userData }) => {
        const options = {
            method: "POST",
            url: "/auth/login",
            data: {
                userData
            },
        };
        return API.request(options);
    },

    forgotPass: (password) => {
        const options = {
            method: "POST",
            url: "/auth/forgot-pass",
            data: {
                password,
            }
        };
        return API.request(options);
    },

    registerAlumni: ({ userData }) => {
        const options = {
            method: "POST",
            url: "/auth/register/alumni",
            data: userData
        };

        return API.request(options);
    },

    registerCompany: ({ userData }) => {
        const options = {
            method: "POST",
            url: "/auth/register/company",
            data: userData
        }

        return API.request(options);
    }
}

export default AuthAPI;