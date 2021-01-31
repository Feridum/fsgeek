
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
};
