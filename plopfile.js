
module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('add-post', {
        description: 'create post skeleton',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'post name'
        }],
        actions: data => {

            data.date = new Date().toISOString();
            const year = new Date().getFullYear();

            return [{
                type: 'add',
                path: `content/posts/${year}/{{name}}/index.md`,
                templateFile: 'plop-templates/post.hbs'
            }]
        }
    });
    plop.setGenerator('add-adr', {
        description: 'create new adr entry',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Name of change'
        },
        {
            type: 'input',
            name: 'context',
            message: 'Change context'
        },
        {
            type: 'input',
            name: 'options',
            message: 'Options you considered'
        },
        {
            type: 'input',
            name: 'decision',
            message: 'Final decision'
        }
        ],

        actions: data => {

            data.date = new Date().toISOString();
            const title = data.name.toLowerCase().replace(/\s/g, '-')

            return [{
                type: 'add',
                path: `adr/${title}.md`,
                templateFile: ' /adr.hbs'
            }]
        }
    });
};
