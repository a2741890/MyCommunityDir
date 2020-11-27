// 使用 Mock
import Mock from 'mockjs'


export default Mock.mock(RegExp('/postdata' + '.*'),'post', (options) => 
{
    var data = JSON.parse(options.body);

    var template = {
        'savedNote|1': [{
            'id|+1': `${data.id}`,
            'userName':`${data.userName}`,
            'note':`${data.note}`,
        }]
    };

    return Mock.mock(template); 
})