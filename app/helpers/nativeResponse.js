module.exports = (v, status = 200, res) => {
    res.status(status).json({
        "responseTimeUTC": new Date().toUTCString(),
        "responseTimeLocal": new Date(),
        'dataState': v.dataState,
        'message': v.message,
        'errorLog': v.errorLog,
        'data': v.data,
        'resState': v.resState,
        'apiDen': 'Meow',
        'apiVersion': 'v1.0.0',
        'stableRelease': 'September 25, 2021',
        'credits': [
            {
                'Section': 'Software And System Architect',
                'People': [
                    {
                        'Name': 'Abu Daud Hossain',
                        'Email': 'abudaud.web@gmail.com',
                        'Image': 'https://i.ibb.co/m6hxS1q/abu-daud.png'
                    }
                ]
            },
            {
                'Section': 'Backend & Web Engines',
                'People': [
                    {
                        'Name': 'Abu Daud Hossain',
                        'Email': 'abudaud.web@gmail.com',
                        'Image': 'https://i.ibb.co/m6hxS1q/abu-daud.png'
                    }
                ]
            },
            {
                'Section': 'Mobile App UI & Integration',
                'People': [
                    {

                    }
                ]
            },
            {
                'Section': 'Web Frontend Design & Integration',
                'People': [
                    {
                        'Name': 'Abu Daud Hossain',
                        'Email': 'abudaud.web@gmail.com',
                        'Image': 'https://i.ibb.co/m6hxS1q/abu-daud.png'
                    }
                ]
            },
            {
                'Section': 'Server Administration',
                'People': [

                    {
                        'Name': 'Abu Daud Hossain',
                        'Email': 'abudaud.web@gmail.com',
                        'Image': 'https://i.ibb.co/m6hxS1q/abu-daud.png'
                    }
                ]
            }

        ]
    });
}