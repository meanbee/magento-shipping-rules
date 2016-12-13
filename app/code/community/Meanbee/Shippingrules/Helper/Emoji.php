<?php
require_once('Emojione/Client.php');
class Meanbee_Shippingrules_Helper_Emoji extends Mage_Core_Helper_Abstract {

	public function __construct()
	{
		$this->_libraryClient = new Emojione_Client(
		    null,
            Mage::getDesign()->getSkinBaseUrl() . 'lib/emojione/png/',
            Mage::getDesign()->getSkinBaseUrl() . 'lib/emojione/svg/',
            Mage::getDesign()->getSkinUrl('lib/emojione/sprites/emojione.sprites.svg')
        );
	}

	/**
	 * Helper function for emoji libary to convert unicode character(s) to emoji image(s).
	 *
	 * @param  string  $unicode
	 * @param  boolean &$match  Side-effect; indicates whether any emoji were found.
	 * @return string           HTML with image tags.
	 */
	public function unicodeToImage($unicode, &$match)
	{
		$html = $this->_libraryClient->unicodeToImage($unicode);
		$match = (bool) preg_match("/<img/", $html);
		return $html;
	}
}
