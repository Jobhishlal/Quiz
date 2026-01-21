export enum QuizValidationMessage {
    TITLE_REQUIRED = 'Title is required',
    DURATION_REQUIRED = 'Duration is required',
    GROUP_REQUIRED = 'Group is required',
    AT_LEAST_ONE_QUESTION = 'At least one question is required',
    QUESTION_TEXT_REQUIRED = 'Text is required',
    MIN_OPTIONS_REQUIRED = 'At least 2 options are required',
    DUPLICATE_OPTIONS = 'Duplicate options are not allowed',
    CORRECT_ANSWER_REQUIRED = 'Correct answer is required',
    CORRECT_ANSWER_MUST_MATCH = 'Correct answer must be one of the options',
}
