import Mock from "mockjs";

Mock.mock("/question/start", "get", function (options) {
  console.log(options);
  return Mock.mock({
    code: 1,
    data: {
      code: 1,
      title: "两数之和",
      questionId: "ajkdfnlasdf",
      answer_num: 123,
      passrate: "50%",
      difficulty: "easy",
      content: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
          你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
          你可以按任意顺序返回答案。`,
      comment_num: "234",
      create_time: new Date(),
      update_time: new Date(),
      state: "未做",
      thumbup: 123,
      commit_body: 12,
      commit_num: 1300,
      answe_num: 1234,
    },
    message: "请求成功！",
  });
});

Mock.mock("/common/like", "post", function (options) {
  return Mock.mock({
    code: 200,
    message: "OK",
    data: "点赞成功",
  });
});

Mock.mock("/commit/all", "post", function (options) {
  return Mock.mock({
    code: 200,
    message: "OK",
    data: {
      commitList: [
        {
          memory: "47.6ms",
          commitResult: "accepted",
          commitTime: 123,
          runtime: "13ms",
        },
        {
          memory: "47.6ms",
          commitResult: "accepted",
          commitTime: "1232",
          runtime: "13ms",
        },
        {
          memory: "47.6ms",
          commitResult: "accepted",
          commitTime: "23",
          runtime: "13ms",
        },
        {
          memory: "47.6ms",
          commitResult: "accepted",
          commitTime: "2332",
          runtime: "13ms",
        },
      ],
    },
  });
});

Mock.mock("/question/run", "post", function (options) {
  console.log(options);
  return Mock.mock({
    code: 200,
    message: "OK",
    data: {
      state: "已完成",
      input: "25",
      output: "2",
      exceptResult: "4",
    },
  });
});
