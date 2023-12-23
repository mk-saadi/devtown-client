import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContent1 = ({ content }) => {
	return (
		<div className="relative">
			<ReactMarkdown
				className="overflow-auto text-base font-semibold prose break-words whitespace-pre-line text-gray-900/70 markdown"
				remarkPlugins={[remarkGfm]}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};

export default PostContent1;
