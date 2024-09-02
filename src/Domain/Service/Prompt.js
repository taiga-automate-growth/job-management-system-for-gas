class Prompt{
    constructor(){

    }

    /**
     * 提案文を生成するためのプロンプト
     * 
     * @param {Job} job - 求人情報
     * @param {Achievements} achievements - 実績一覧
     * @returns 
     */
    forGenerateSuggestion(job, achievements){
        let prompt = `【求人情報】
            ${job.getDetail()}

            【提案文生成】
            上記求人情報に基づき、以下の要素を含めた提案文を生成してください。

            自己紹介: 私のスキルや経験、この仕事に興味を持った理由などを簡潔に述べます。
            求人への理解: 求人の内容を要約し、私がどのように貢献できるかを示します。
            条件への回答:
            納期: 提案された納期に対する回答（守れるか、調整が必要かなど）
            使用するツール: 指定されたツールに関する経験やスキルレベル
            契約金額: 提案された契約金額に対する回答（交渉したい場合など）
            その他条件: その他の応募条件に対する個別の回答
            アピールポイント: 私の強みや、この仕事で成功させるための具体的なアイデアを提示します。
            応募動機: この会社、この仕事を選んだ理由を述べます。
            【提案文の形式】
            提案書形式で、丁寧な言葉遣いを心がけてください。

            【その他】

            提案文は、300字～500字程度で作成してください。
            提案文の末尾には、連絡先を明記してください。
                    
            【実績】
        `;

        while(achievements.hasNext()){
            const achievement = achievements.next();
            prompt += `・詳細${achievements.index + 1}: ${achievement}\n`;
        }

        return prompt;

    }
}