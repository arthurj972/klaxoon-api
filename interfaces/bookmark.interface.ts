export interface BookmarkInterface {
	title: String,
	url: String,
	author: String,
	thumbnail: String,
	upload_date: Date | null,
	user_id: Number,
	type: String,
	width: Number,
	height: Number,
	duration: Number | null,
}