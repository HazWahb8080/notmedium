export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'approved',
      type: 'boolean',
      description:"comments won't show on the site withour approval",
    },
    {
        name:"email",
        type:"string",
    },
    {
        name:"comment",
        type:"text",
    },
    {
        name:"post",
        type:"reference",
        to: [{type:"post"}],
    },

],
}